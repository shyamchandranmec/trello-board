/**
 * Created by shyam on 08/05/16.
 */
(function () {
    app.randomIntFromInterval = function (min, max){
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
})();