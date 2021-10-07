'use strict';
const jwt_decode = require("jwt-decode");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async find(ctx){
        const dashboards = await strapi.services.dashboard.find();
        const loggedInUser = jwt_decode(ctx.request.header.authorization.split(' ')[1]);
        return dashboards.reduce((acc, cur)=>{
            const userCanAccessDashboard = cur?.users.find(user => user.id === loggedInUser.id);
            if(userCanAccessDashboard){
                return [
                ...acc,
                {
                    id: cur.id,
                    dashboard_name: cur.dashboard_name,
                    dashboard_url: cur.dashboard_url,
                    type: cur.type,
                }];
            }
            return acc;
        },[]);;
    }
};
