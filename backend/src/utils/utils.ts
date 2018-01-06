export default class Utils {
    
    public static randomHash() {
        let text = '';
        let possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
        for(let i = 0; i <= 10; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
}