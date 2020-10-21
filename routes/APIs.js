const express = require('express');
const { get } = require('http');
const fs = require('fs');
const path = require('path');
const Routes = express.Router();


Routes.get('/profile', (req, res) => { });

Routes.get('/about', (req, res) => { });

Routes.get('/weddings', (req, res) => { });

Routes.get('/preweddings', (req, res) => { });

Routes.get('/kidsshoots', (req, res) => { });

Routes.get('/familyshoots', (req, res) => { });

Routes.get('/contact', (req, res) => { });

Routes.get('/', (req, res) => { });

Routes.get('/', (req, res) => { });

Routes.get('/', (req, res) => { });

Routes.get('/', (req, res) => { });

Routes.get('/', (req, res) => { });


module.exports = Routes();