import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoaderService {
    isLoading: Boolean= false
    constructor() { }
}
