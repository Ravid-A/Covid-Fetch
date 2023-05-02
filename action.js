import { Router } from "express";
import fetch from "node-fetch";

const router = Router();

router.get('/top', async (req, res) => {
    const data = await fetch('https://api.covidtracking.com/v1/states/daily.json', { method: 'GET' });

    const formateddata = await data.json();

    let contries = [];

    formateddata.forEach((element) => {
        
        let exist = false;
        contries.forEach((country) => {
            if (country.state === element.state) {
                country.death += element.death;
                country.positive += element.positive;
                exist = true;
            }
        });

        if (!exist) {
            contries.push({
                state: element.state,
                death: element.death,
                positive: element.positive
            });
        }
    });

    let sorted_death = contries.sort((a, b) => b.death - a.death);
    let sorted_positive = contries.sort((a, b) => b.positive - a.positive);

    sorted_death = sorted_death.map((element) => {
        return element.state + " - " + element.death;
    });

    sorted_positive = sorted_positive.map((element) => {
        return element.state + " - " + element.positive;
    });
    
    return res.status(200).json({
        death: sorted_death.slice(0, 10),
        positive: sorted_positive.slice(0, 10)
    });
});

export default router;