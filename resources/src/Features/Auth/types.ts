import React from 'react'

function types() { }

export default types

export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface LoginPayload {
    email: string,
    password: string
}

