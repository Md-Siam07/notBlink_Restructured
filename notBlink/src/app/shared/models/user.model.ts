export class User {
    constructor(
        public _id?: string,
        public email?: string,
        public fullName?: string,
        public password?: string,
        public institute?: string,
        public phone_number?: string,
        public designation?: string,
        public batch?: number,
        public roll?: number,
        public verified?: Boolean,
        public isTeacher?: Boolean
    ){}

}
