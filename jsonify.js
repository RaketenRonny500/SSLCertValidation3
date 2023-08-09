'use strict';

/*const fs = require('fs');*/

import fs from 'fs'

const form = document.getElementById('certCheck');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(form);

    const jsonObject = Object.fromEntries(formData);

    const jsonString = JSON.stringify(jsonObject);

    fs.writeFileSync('certList.json', jsonString)

    console.log(jsonString);
});