import { settingsDB } from "../../db/db";

export async function load() {

    let all_settings = await settingsDB.getAllSettings(); 

    let settings = [
        {
            key: 'proxy',
            value: all_settings.find(setting => setting.key === 'proxy').value || "",
            type: 'text',
        },
        {
            key: 'repo',
            value: all_settings.find(setting => setting.key === 'repo').value || "",
            type: 'text',
        },
        {
            key: 'nsfw',
            value: all_settings.find(setting => setting.key === 'nsfw').value || false,
            type: 'toggle',
        }

    ]


	return {settings};
}