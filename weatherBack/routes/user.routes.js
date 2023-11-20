const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const creditController = require("../controllers/credit.controller");
const axios = require("axios");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/test/all", controller.allAccess);

    app.get(
        "/api/test/user",
        [authJwt.verifyToken],
        controller.userBoard
    );

    app.get(
        "/api/test/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    );

    const data = [];
    app.get("/user", async (req, res) => {
        clearData();
        let strTime1 = []; let strTime2 = []; let strTime3 = []; let endTime1 = []; let endTime2 = [];let endTime3 = [];
        await creditController.updateCredit(req.query.id);
        console.log('////////////////////////////////////////' + req.query.city);
        for (let i = 0; i < 20 ; i++) {
            strTime1[i] = new Date().getTime();
            await sendOpenWeather(req.query.city,i);
            endTime1[i] = new Date().getTime();

            strTime2[i] = new Date().getTime();
            await sendPrevisionMeteo(req.query.city,i);
            endTime2[i] = new Date().getTime();

            strTime3[i] = new Date().getTime();
            await sendWeatherApi(req.query.city,i);
            endTime3[i] = new Date().getTime();

        }
        openWeatherTime = [];
        previsionMeteoTime = [];
        weatherApi = [];
        moyenneTime=[];
        for (let i = 0; i < 20; i++) {
            openWeatherTime[i] = (endTime1[i] - strTime1[i]);
            previsionMeteoTime[i] = (endTime2[i] - strTime2[i]);
            weatherApi[i] = (endTime3[i] - strTime3[i]);
            moyenneTime[i] = ((endTime1[i] - strTime1[i]) + (endTime2[i] - strTime2[i]) + (endTime3[i] - strTime3[i]))/3;
        }
        const credit = await creditController.getCredit(req.query.id);
        console.log('////////////////////////////////////////' + credit);
        let datas = {
            dataOpenWeather: data[0],
            dataPrevisionMeteo: data[1],
            dataWeatherApi: data[2],
            dataCredit: {
                name: 'credit',
                solde: credit
            },
            timeOpenWeather: openWeatherTime,
            timePrevisionMeteo: previsionMeteoTime,
            timeWeatherApi: weatherApi,
            moyenneTime: moyenneTime
        }
        console.log("test 00 :" + datas);
        res.send(datas);
    });

    const sendOpenWeather = async (city,i) => {
        try {
            const resp = await axios.get('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&appid=54cb1c5a0f7e631bbd26a8b484b03156');
            if (i == 19) data.push(resp.data);
        } catch (err) {
            console.error(err);
        }

    };
    sendPrevisionMeteo = async function (city,i) {
        try {
            const resp = await axios.get('http://www.prevision-meteo.ch/services/json/' + city);
            if (i == 19) data.push(resp.data);
        } catch (err) {
            console.error(err);
        }
    }
    sendWeatherApi = async function (city,i) {
        try {
            const resp = await axios.get('http://api.weatherstack.com/current?access_key=44ea8fb52eff14f56cc6380715fd3d68&query=' + city);
            if (i == 19) data.push(resp.data);
        } catch (err) {
            console.error(err);
        }
    }

    clearData = function (){
        for (let i = 0; i < data.length; i++) {
            data.pop();
        }
    }
};
