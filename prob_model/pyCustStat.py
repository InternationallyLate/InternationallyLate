import subprocess
import numpy as np
import cmath
import sklearn 
import requests
import openpyxl
from collections import Counter
import matplotlib.pyplot as plt
import sys
import json
import csv

# Package name you want to install
package_names = ["requests","openpyxl"]
for package_name in package_names:
    # Using subprocess to run the pip install command
    subprocess.check_call(["pip", "install", package_name])

    
def get_zipcode_from_ip(ip_address):
    url = f"http://ipinfo.io/{ip_address}/json"
    response = requests.get(url)
    data = response.json()
    zipcode = data.get("postal", "ZIP code not found")
    return zipcode

percent=0.15 #how much of annual salary a smart consumer is willing to spend annually on phone/internet plans
file_path = '../datasets/20zp10fl.xlsx'  # Replace path with your Excel file path containing income information
filepath="../datasets/Population_by_Age_Group_State_Florida.csv" # Replace path with your Excel file path containing demographics

# Function to draw histogram based on ZIP code input
def draw_histogram_for_zipcode(file_path, target_zipcode,percent=percent):
    y_values = []  # counts
    x_values=["$1 under $25,000","$25,000 under $50,000","$50,000 under $75,000","$75,000 under $100,000","$100,000 under $200,000","$200,000 or more"]
    xs=[25000,50000,75000,100000,200000]
    # Read data from Excel file
    workbook = openpyxl.load_workbook(file_path)
    sheet = workbook.active

    zip_code_found = False

    for row_idx, row in enumerate(sheet.iter_rows(), start=0):
        # print(row_idx)
        if row_idx in np.arange(7,13):
            y_values.append(row[2].value)
        elif row_idx>=14:
            break
    # print(np.where(y_values==np.max(y_values))[0])
    mon_mon=xs[np.where(y_values==np.max(y_values))[0][0]]*percent/12
    print(f"the customer can afford {mon_mon} $ a month on phone and internet plans")
    # plt.bar(x_values, y_values, alpha=0.7, color='blue', edgecolor='black')
    # plt.xlabel('income')
    # plt.ylabel('Frequency')
    # plt.title(f'Histogram for ZIP Code {target_zipcode}')
    # plt.xticks(rotation=45, ha='right')  # Rotate x-axis labels for better visibility
    # plt.tight_layout()
    # plt.show()
    return mon_mon

def assumed_age(filepath):
    count=[]
    age_group=[]
    with open(filepath, 'rt',encoding='cp1252') as csvfile:
        csvreader = csv.reader(csvfile, delimiter=',')
        for row_idx,row in enumerate(csvreader):
            if row_idx==0:
                continue
            age_group.append(row[0])
            count.append(float(row[1]))
    # print(np.where(count==np.max(count)),np.max(count))
    xss=age_group[np.where(count==np.max(count))[0][0]]
    print(f"the client is more likely to be within {xss} age group")
    return xss


def generate_json_file(data, file_path):
    """
    Generate a JSON file with the provided data.

    Args:
        data (dict): Data to be stored in the JSON file.
        file_path (str): Path where the JSON file will be saved.
    """
    try:
        with open(file_path, 'w') as json_file:
            json.dump(data, json_file, indent=4)
        print(f"JSON file '{file_path}' has been generated successfully.")
    except Exception as e:
        print(f"Error: {e}")





def main(IP_add):
    zip_code=get_zipcode_from_ip(IP_add)
    mony= draw_histogram_for_zipcode(file_path,zip_code)
    age_gr=assumed_age(filepath)
    # Example usage
    data_to_store = {"messages": [{"role": "system","content": f" You are serving in a verizon store at {zip_code}. Assume the client can afford spending {mony} us dollars per month and they are within {age_gr} age group"},       {"role": "user","content": ""}]}
    
    json_file_path = "./data.json"
    generate_json_file(data_to_store, json_file_path)
    
    
    
if __name__=='__main__':

    # print command-line arguments
    # (1st arg is always name of function)
    print(sys.argv) 
    # If we have 2 command-line args, assume 2nd is the IP address
    if len(sys.argv)>=2:
        IP = sys.argv[1]
    else:
        print("ERROR: You need to provide the IP address. MAKE SURE YOU HAVE THE CORRECT INPUTS")
    main(IP)