from sklearn.externals import joblib
import numpy as np
import sys
data = sys.argv[1:]      # list of 5 elements
# data=data.type('float')
# data = data.reshape(1,5)
# data = np.array(data)


data2 = []

for i in data:
    data2.append(float(i))

data2 = np.array(data2)
data2 = data2.reshape(1,5)

model=joblib.load('housePrice')
print(model.predict(data2))
sys.stdout.flush()