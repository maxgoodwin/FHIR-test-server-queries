const axios = require('axios');
const util = require('util');

const baseUrl = 'https://r4.ontoserver.csiro.au/fhir';
const ankleAmputationCode = 397218006;
const disarticulationCode = 15440009;
const system = 'http://snomed.info/sct';
const format = 'json';
const snomedCodeLookupURL = `${baseUrl}/CodeSystem/$lookup?system=${system}&code=${ankleAmputationCode}&_format=${format}`;
const snomedValueSetExpandURL = `${baseUrl}/ValueSet/$expand?url=${system}?fhir_vs=isa/${disarticulationCode}`;

const getSnomedCodeLookup = async (url) => {
    const response = await axios.get(url);
    // We can retrieve server infor from the headers of any request
    console.log('~~~~~ Server/data version: ' + response.headers['x-powered-by'] + ' ~~~~~');
    console.log();
    console.log(`~~~~~ Snomed code ${ankleAmputationCode} name: 
        ${util.inspect(response.data.parameter[0].valueString, false, null, true)} ~~~~~`);
    console.log();
}

const getSnomedValueSet = async (url, valueSetName) => {
    const response = await axios.get(url);
    const children = response.data.expansion.contains;
    console.log(`~~~~~ types of ${valueSetName} ~~~~~`);
    children.forEach(child => {
        console.log(child.display);
    });
    console.log();
}

getSnomedCodeLookup(snomedCodeLookupURL);
getSnomedValueSet(snomedValueSetExpandURL, 'disarticulation');
