const mySQLService = require('../mysql-service');
const { jsDateToString } = require('../utils');

class ReportSQL {

    viewAllReports() {
        return this.queryToPromise('SELECT * FROM reports');
    }

    addReport(newReport) {
        return this.queryToPromise(
            `INSERT INTO reports(locationId, date, catchCount) VALUES
                (
                    ${newReport.locationId},
                    STR_TO_DATE("${jsDateToString(newReport.date)}",'%Y-%m-%d'),
                    ${newReport.catchCount}
                );`
        );
    }

    queryToPromise(query) {
        return new Promise((resolve, reject) => {
            mySQLService.mySQLConnection.query(query, function (error, results) {
                if (error) {
                    reject(error);
                };
                resolve(results);
            });
        });
    }
}

module.exports = new ReportSQL();