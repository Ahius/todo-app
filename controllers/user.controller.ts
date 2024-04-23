import { Request, Response } from "express";
import User from "../models/user-model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {IUser} from "../types/index.d"
import { Types } from "mongoose";

const getUserToken = (_id: string | Types.ObjectId) => {
        const authenticatedUserToken = jwt.sign({_id}, "express", {
            expiresIn: "7d",
        })
        return authenticatedUserToken;
}



export const createUser = async (request: Request, response: Response) => {
    try {
        const { name, email, password } = request.body;

        if (!name || !email || !password) {
            return response.status(400).send('Name, email, and password are required!');
        }

        const existingUser = await User.find({ email });

        if (existingUser.length > 0) {
            return response.status(409).send('Email user already exists!');
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({
            name,
            email,
            password: hashedPassword, 
        });

        return response.status(201).send({ message: "User created successfully!" });
    } catch (error) {
        console.log('Error creating user:', error);
        throw error;
    }
};

export const loginUser = async (request: Request, response: Response) => {
    try {
        const {email, password} : IUser = request.body;
        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            return response.status(409).send({message:"User does not exist!"})
        }
        const isPasswordIdentical = await bcrypt.compare(
            password,
            existingUser.password
        )

        if(isPasswordIdentical) {
            const token = getUserToken(existingUser._id)
            return response.send({
                token,
                user: {
                    email: existingUser.email,
                    name: existingUser.name,

                },
            })
        } else {
            return response.status(400).send({message: "Wrong credentials! "})
        }



    } catch (error) {
        console.log("erorr in loginUser", error);
        throw error
        
    }
}
