import json
import pickle
import numpy as np

__locations = None
__data_columns = None
__model = None

def get_extimated_price(location,sqft,bhk,bath):
    try:
        loc_index= __data_columns.index(location.lower())
    except:
        loc_index= -1
 
    z=np.zeros(len(__data_columns))
    z[0]=sqft
    z[1]=bath
    z[2]=bhk
    if loc_index >= 0:
        z[loc_index]=1

    return round(__model.predict([z])[0],2)

def get_location_names():
    return __locations

def load_saved_file():
    print('loading saved files in the artifacts ... start')
    global __data_columns
    global __locations
    global __model

    with open("./artifacts/columns.json",'r') as f:
        __data_columns =json.load(f)["data_columns"]
        __locations = __data_columns[3:]   # starting from column number three

    with open("./artifacts/bangaluru_home_price.pickle",'rb') as f:
        __model = pickle.load(f)
    print('loading saved file ....done')


if __name__ =="__main__":
    load_saved_file()
    print(get_location_names())
    print(get_extimated_price("1st block jayanagar",2000,3,2))
    print(get_extimated_price("1st block jayanagar",2000,2,3))
    print(get_extimated_price("yelenahalli",2000,2,2))
    print(get_extimated_price("whitefield",2000,2,2))
