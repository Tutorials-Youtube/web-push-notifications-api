import { redBright } from "ansi-colors";
import { Application } from "express";
import inquirer from "inquirer";
import { checkPortStatus } from "portscanner";

const getPort = async (PORT: number) => {
    return new Promise(async (resolve) => {
        const response = await inquirer.prompt({
            type: 'confirm',
            name: 'res',
            message: `Port ${PORT} is already in use. Do you want to use another port?`,
            default: false
        });
        if (response.res) {
            const getDynamicPort = async (port: number) => {
                const statusPort = await checkPortStatus(port, 'localhost');
                if (statusPort == 'closed')
                    resolve(port);
                else await getDynamicPort(port + 1);
            }
            await getDynamicPort(PORT + 1);
        }
        else {
            const getInput = async () => {
                const response = await inquirer.prompt({
                    type: 'input',
                    name: 'port',
                    message: `Write the port number to use:`
                });
                const statusPort = await checkPortStatus(Number(response.port), 'localhost');
                if (statusPort == 'closed') resolve(response.port);
                else {
                    console.log(redBright('Port not available, try another:'));
                    await getInput();
                };
            }
            resolve(await getInput());
        }
    })
}

export const middlewaresDynamicPort = async (app: Application) => {
    const PORT = Number(process.env.PORT);
    const statusPort = await checkPortStatus(PORT, 'localhost');
    if (statusPort == 'closed')
        app.set('port', PORT);
    else app.set('port', await getPort(PORT));
}