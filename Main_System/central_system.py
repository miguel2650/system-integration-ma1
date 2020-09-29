import requests
import csv
import xml.etree.ElementTree as ET
import pandas as pd
import random


def post_csv_as_xml(file_path: str, url: str = 'http://localhost:8080/nemID'):
    """Reads from a csv file in the format:\n
        FirstName,LastName,Email,DateOfBirth,Phone,Address,Country\n
        and post each line to the nemID api."""

    df = pd.read_csv(file_path)

    for index, row in df.iterrows():
        cpr = generate_cpr(row.DateOfBirth)
        data = create_xml(
            row.FirstName,
            row.LastName,
            cpr,
            row.Email
        )
        try:
            headers = {'Content-Type': 'text/xml'}
            r = requests.post(url, data=ET.tostring(data), headers=headers)
            print(ET.tostring(data))
            r.raise_for_status()
        except requests.exceptions.HTTPError as err:
            write_err_log(err)
            continue


def generate_cpr(birthdate: str):
    """Generates 4 random numbers between 0 and 9."""
    randomcpr = random.sample(range(0, 9), 4)
    cpr_str = "".join(str(e) for e in randomcpr)
    return birthdate + '-' + cpr_str


def create_xml(fName: str, lName: str, cpr: str, eMail: str):
    """Returns a XML object of type Person with relevant attributes"""

    try:
        person = ET.Element("Person", version="1.0")
        firstname = ET.SubElement(person, "FirstName")
        lastname = ET.SubElement(person, "LastName")
        cprnumber = ET.SubElement(person, "CprNumber")
        email = ET.SubElement(person, "Email")
        firstname.text = fName
        lastname.text = lName
        cprnumber.text = cpr
        email.text = eMail
    except ET.ParseError as err:
        write_err_log(err)

    return person


def write_err_log(error: Exception):
    """Write Exception to log file."""
    with open('error_log.txt', 'a') as f:
        f.write(str(error))


post_csv_as_xml("people.csv")
