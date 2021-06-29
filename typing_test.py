import random
import time
import tkinter as tk
from tkinter import font
from datetime import datetime
import numpy as np
import matplotlib
import matplotlib.pyplot as plt
matplotlib.use("TkAgg")
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg

##Locating and Sizing GUI
display_window = tk.Tk()
window_width = 500
window_height = 700
screen_width = display_window.winfo_screenwidth()
screen_height = display_window.winfo_screenheight()
x = 3*(screen_width - window_width)/4
y = (screen_height - window_height)/2
display_window.geometry('%dx%d+%d+%d' % (window_width, window_height, x, y))

#Dictionary Choice
list_of_dicts = ["dict_1k.txt","dict_20k.txt"]
list_of_scores = ["scores_1k.txt","scores_20k.txt"]
dict_index = 1

#Length of typing test
test_length = 30
words_per_test = 100

#Importing dictionary txt into list
dictionary_file = open(list_of_dicts[dict_index],"r")
dictionary_string = dictionary_file.read() ##Reading file into string
dictionary_file.close()
dictionary_list = dictionary_string.split() ##Splitting string into list

testing = False
#Creating Random List for Typing Test
typing_list = []
word_list = []
for i in range(words_per_test):
    typing_word = dictionary_list[random.randint(0,len(dictionary_list)-1)] ##Selecting random word from dictionary
    word_list.append(typing_word) ##Adding word to list of words
    for char in list(typing_word): typing_list.append(char) ##Adding character to list of chars
    typing_list.append(" ") ##Adding spaces inbetween words in list of chars
display_string = " ".join(word_list) ##Converting list of words to string

##Typing Test Widgets
timer = tk.Label(display_window, text = "TIMER") ##Timer Widget
user_entry = tk.Entry(display_window, width=50) ##Entry Widget
words_to_type = tk.Text(display_window, height = 15, width = 50, wrap = tk.WORD) ##Words to type widget

##Real-time Graph Widget
fake_time = np.arange(0,60)
if dict_index == 0: wpm_goal = 75 * np.ones(60)
else: wpm_goal = 60 * np.ones(60)
time_array = [0]
total_words_array = [0]
wpm_array = [0]
fig1 = plt.Figure(figsize=(4,4))
ax = fig1.add_subplot(111)
real_time_graph = FigureCanvasTkAgg(fig1, display_window)
total_words_line, = ax.plot(time_array,total_words_array, color="r", label="Total Words")
wpm_line, = ax.plot(time_array,wpm_array,color="g", label="WPM")
goal_line, = ax.plot(fake_time, wpm_goal, color = "b", label = "WPM Goal")
ax.axes.set_xlim(0,test_length)
ax.axes.set_ylim(0,120)
fig1.legend()

##Displaying words to type
words_to_type.insert(tk.END,display_string)

##Creating fonts and tags
words_to_type.tag_configure("CORRECT", foreground="green")
words_to_type.tag_configure("CURRENT", background="black", foreground="white")

##Creates current text marks at beginning
words_to_type.mark_set("CURRENT_CHAR", 1.0)
words_to_type.mark_set("BEGIN_CURRENT_WORD", 1.0)
words_to_type.mark_set("END_CURRENT_WORD", 1.0)

timer.pack()
user_entry.pack()
words_to_type.pack()
real_time_graph.get_tk_widget().pack()
display_window.update() 

while testing == False: 
    display_window.update()
    if user_entry.get() != "": testing = True

##Starting Test 
start_time = time.time()
total_characters = 0
total_words = 0
last_time_remaining = 0

##First word
current_word = list(word_list[total_words])
characters_to_type = len(current_word)
for i in range(characters_to_type):
    words_to_type.mark_set("END_CURRENT_WORD", "END_CURRENT_WORD + 1c")
words_to_type.tag_add("CURRENT","BEGIN_CURRENT_WORD","END_CURRENT_WORD")

##Main Loop
while testing:
    display_window.update()

    time_remaining = round(test_length - (time.time() - start_time),1) #Calculating time remaining
    timer.configure(text="{}".format(time_remaining)) ##Displaying time remaining

    currently_typed = list(user_entry.get()) ##Gets user input as string
    number_typed = len(currently_typed)

    ##Checks if most recent typed letter is the same as the most recent displayed character as well as second most recent character and second most recent displayed
    if number_typed > 0 and currently_typed[-1] == typing_list[total_characters]:
        if number_typed > 1:
            if currently_typed[-2] == typing_list[total_characters-1]:
                total_characters += 1
                words_to_type.tag_add("CORRECT","CURRENT_CHAR")
                words_to_type.mark_set("CURRENT_CHAR", "CURRENT_CHAR + 1c")
        else:
            total_characters += 1
            words_to_type.tag_add("CORRECT","CURRENT_CHAR")
            words_to_type.mark_set("CURRENT_CHAR", "CURRENT_CHAR + 1c")

    ##Checks if new word reached and clears entry field
    if currently_typed == current_word + list(" "):
        #Untagging finished word
        words_to_type.tag_remove("CURRENT","BEGIN_CURRENT_WORD","END_CURRENT_WORD")

        total_words += 1
        current_word = list(word_list[total_words])
        characters_to_type = len(current_word)
        user_entry.delete(0, tk.END)

        #Tagging new word
        words_to_type.mark_set("BEGIN_CURRENT_WORD", "END_CURRENT_WORD + 1c")
        for i in range(characters_to_type + 1):
            words_to_type.mark_set("END_CURRENT_WORD", "END_CURRENT_WORD + 1c")
        words_to_type.tag_add("CURRENT","BEGIN_CURRENT_WORD","END_CURRENT_WORD")

        ##Recording real time typing data
        time_array.append(test_length-time_remaining)
        total_words_array.append(total_words)
        wpm_array.append((test_length*(total_characters/6)/(test_length-time_remaining))*(60/test_length))
        last_time_remaining = time_remaining
        total_words_line.set_xdata(time_array)
        wpm_line.set_xdata(time_array)
        total_words_line.set_ydata(total_words_array)
        wpm_line.set_ydata(wpm_array)
        fig1.canvas.draw()
        fig1.canvas.flush_events()

    timer.pack()
    words_to_type.pack()
    real_time_graph.get_tk_widget().pack()

    ##Ending Test
    if time_remaining <= 0: testing = False 

##Displaying Results and Writing to File

##Correcting for index = 0
total_words += 1
total_characters += 1

##Writing to file
now = datetime.now()
date = now.strftime("%d/%m/%y %H:%M:%S")

scores_file = open(list_of_scores[dict_index],"a+")
scores_file.write("{} {} \n".format(date,round((total_characters/6)*60/test_length,1)))
scores_file.close()

##Removing previous widgets excluding real time graph
timer.destroy()
words_to_type.destroy()
user_entry.destroy()

##Results widget
wpm = tk.Text(display_window, height = 1, width = 30) ##WPM Widget
cpm = tk.Text(display_window, height = 1, width = 30) ##CPM Widget
wpm.insert(tk.END,"Words per Minute: {}".format(round((total_characters/6)*60/test_length,1))) ##Display WPM
cpm.insert(tk.END, "Characters per Minute: {}".format(total_characters*60/test_length)) ##Display CPM

##Date Graph widget (want to )
##Opening 1k dictionary scores
scores_list_1k = np.genfromtxt("scores_1k.txt", dtype=("|S8","|S8",int))
dates = []
times = []
scores_1k = []
#dates = [entry[0] for entry in scores_list] alt way using list comprehension
for entry in scores_list_1k: ##Cutting up list
    dates.append(entry[0])
    times.append(entry[1])
    scores_1k.append(entry[2])
datestimes_1k = [date + " ".encode("UTF-8") + time for date, time in zip(dates, times)] ##Creating strings of datetimes
datestimes_objs_1k = [datetime.strptime(entry.decode("UTF-8"),"%d/%m/%y %H:%M:%S") for entry in datestimes_1k] ##Creating datetime objects
dates_to_plot_1k = matplotlib.dates.date2num(datestimes_objs_1k) ##Converting to matplotlib format

##Opening 20k dictionary scores
scores_list_20k = np.genfromtxt("scores_20k.txt", dtype=("|S8","|S8",int))
dates = []
times = []
scores_20k = []
#dates = [entry[0] for entry in scores_list] alt way using list comprehension
for entry in scores_list_20k: ##Cutting up list
    dates.append(entry[0])
    times.append(entry[1])
    scores_20k.append(entry[2])
datestimes_20k = [date + " ".encode("UTF-8") + time for date, time in zip(dates, times)] ##Creating strings of datetimes
datestimes_objs_20k = [datetime.strptime(entry.decode("UTF-8"),"%d/%m/%y %H:%M:%S") for entry in datestimes_20k] ##Creating datetime objects
dates_to_plot_20k = matplotlib.dates.date2num(datestimes_objs_20k) ##Converting to matplotlib format

##Plotting Date Graph
fig2 = plt.Figure(figsize=(4,4))
ax = fig2.add_subplot(111)
date_graph = FigureCanvasTkAgg(fig2, display_window)
ax.plot_date(dates_to_plot_1k,scores_1k, color="b")
ax.plot_date(dates_to_plot_20k,scores_20k,color="r")
ax.axes.xaxis.set_visible(False)

wpm.pack()
cpm.pack()
date_graph.get_tk_widget().pack()
display_window.mainloop()
