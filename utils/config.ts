/** 
 * @class Config
*/
export class Config {
    public stabalizationDelay = 1000;
    private static instance: Config;

    constructor() {
        if (Config.instance) {
            return Config.instance;
        }
        Config.instance = this;
    }

    /**
     * @method Config#get
     * @desc get data set in config
     * @param prop property which to return
     * @return property or null
     **/
    public get(prop: string) {
        if (!!this[prop]) {
            return this[prop];
        };
        return null;
    }

    /**
     * @method Config#set
     * @desc set data in config
     * @param prop property to set
     * @param prop val data you which to store against the property
     * @return void
     **/
    public set(prop: string, val): void {
        this[prop] = val;
    }
}