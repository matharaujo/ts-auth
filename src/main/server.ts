import express from 'express';
import App from './configuration/app';

try {
    new App(express());
} catch (error) {
    console.log(error);
}
