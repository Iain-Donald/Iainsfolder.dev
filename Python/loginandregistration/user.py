# import the function that will return an instance of a connection
from mysqlconnection import connectToMySQL
from flask import flash
# model the class after the friend table from our database
class User:
    def __init__( self , data ):
        self.id = data['id']
        self.first_name = data['first_name']
        self.last_name = data['last_name']
        self.email = data['email']
        self.password = data['password']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']
    # Now we use class methods to query our database
    @classmethod
    def get_all(cls):
        query = "SELECT * FROM loginandregistration.users;"
        # make sure to call the connectToMySQL function with the schema you are targeting.
        results = connectToMySQL('loginandregistration').query_db(query)
        # Create an empty list to append our instances of friends
        usersList = []
        # Iterate over the db results and create instances of friends with cls.
        for users in results:
            usersList.append( User(users) )
        
        return usersList

    @classmethod
    def save(cls, data ):
        query = "INSERT INTO users ( first_name , last_name , email, password , created_at, updated_at ) VALUES ( %(first_name)s , %(last_name)s , %(email)s , %(password)s, NOW() , NOW() );"
        # data is a dictionary that will be passed into the save method from server.py
        return connectToMySQL('loginandregistration').query_db( query, data )

    @classmethod
    def delete(cls, id ):
        query = "DELETE FROM full_crud.users WHERE id="
        query = query + id + ";"
        print(query)
        # data is a dictionary that will be passed into the save method from server.py
        return connectToMySQL('loginandregistration').query_db( query )


    @staticmethod
    def validate_pw(pw, confPw):
        is_valid = True # we assume this is true
        if (pw != confPw):
            is_valid = False
        return is_valid


