import cv2
import tensorflow as tf
from PIL import Image
from mss import mss
import tkinter as tk
import time
import threading
import numpy as np

# model
model = tf.saved_model.load('models')
infer = model.signatures["serving_default"]
with open('models/label_map.txt') as f:
    labels = f.readlines()
    labels = [label.strip() for label in labels]

# gui
label = tk.Label(text='Predicted activity', font=('Times', '44'), fg='green', bg='white')
label.master.overrideredirect(True)
label.master.geometry("+0+0")
label.master.lift()
label.master.wm_attributes("-topmost", True)


# screenshots
def predict():
    mon = {'left': 0, 'top': 0, 'width': 2560, 'height': 1440}
    with mss() as sct:
        while True:
            screen_shot = sct.grab(mon)
            img = Image.frombytes(
                'RGB',
                (screen_shot.width, screen_shot.height),
                screen_shot.rgb,
            )
            img = np.asarray(img.resize((160, 160)))
            img = img.reshape(1, 160, 160, 3)
            x = tf.convert_to_tensor(img, dtype=tf.float32)
            print(infer(x)['dense'].numpy())

            logits = infer(x)['dense'].numpy()
            activity = labels[np.argmax(infer(x)['dense'].numpy())]
            probability = np.exp(np.max(logits)) / np.sum(np.exp(logits))

            label['text'] = f'Predicted activity: {activity}. Probability: {probability*100:.2f}%'
            time.sleep(2)

            if cv2.waitKey(33) & 0xFF in (
                    ord('q'),
                    27,
            ):
                label.quit()
                break


prediction_thread = threading.Thread(target=predict)
prediction_thread.start()

label.pack()
label.mainloop()
