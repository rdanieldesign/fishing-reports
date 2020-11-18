const mySQLService = require('./mysql-service');

class ReportService {

    viewAllReports() {
        return new Promise((resolve, reject) => {
            mySQLService.mySQLConnection.query('SELECT * FROM reports WHERE catchCount > 0', function (error, results, fields) {
                if (error) {
                    reject(error);
                };
                resolve(results);
            });
        });
}
}

module.exports = new ReportService();