require('dotenv').config();

class AppConfig{

    name: string = process.env.APP_NAME || 'CASE MD6';

    port: number = Number(process.env.SV_PORT || 8000);

    host: string = process.env.APP_HOST || 'localhost';

}

export default AppConfig;