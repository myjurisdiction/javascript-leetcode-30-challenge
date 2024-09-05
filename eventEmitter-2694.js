/**
 * The EventEmitter class in Node.js refers to the Observer Pattern (also known as the Publish-Subscribe Pattern).

Key Concepts of the Observer Pattern:
Subjects and Observers:

Subject (EventEmitter): The object that maintains a list of observers and sends notifications to them when an event occurs. In Node.js, EventEmitter is the subject.
Observers (Listeners): The objects that receive updates from the subject. In Node.js, these are the functions you attach to events using methods like on or addListener.
Event Registration:

Observers register their interest in specific events through the on method, providing a callback function that should be invoked when the event occurs.
Event Emission:

When the subject (event emitter) triggers an event using the emit method, it notifies all registered observers (listeners) about the event.
Decoupling:

The observer pattern promotes loose coupling between the subject and observers, as the subject does not need to know specific details about the observers. Observers can be added or removed dynamically without affecting the subject.
How the Observer Pattern is Implemented in Node.js:
EventEmitter Class:

The EventEmitter class provides methods to register listeners (on, addListener), remove listeners (off, removeListener), and emit events (emit).
Event Handling:

Events can be emitted with optional arguments that are passed to the listeners. Listeners are invoked in the order they were registered.
 */

class EventEmitter {
    constructor() {
        this.subject = new Map();
    }
    /**
     * @param {string} eventName
     * @param {Function} callback
     * @return {Object}
     */
    subscribe(eventName, callback) {
        if (typeof eventName !== "string" || typeof callback !== "function") {
            throw new Error("Invalid parameters passed !!");
        }

           const callbackKey = `${callback.toString()}-${Date.now()}-${Math.random()}`;

        if (this.subject.has(eventName)) {
            const callbackQueue = this.subject.get(eventName);
            callbackQueue.push({ key: callbackKey, value: callback });
        } else {
            this.subject.set(eventName, [{ key: callbackKey, value: callback }]);
        }

        return {
            unsubscribe: () => {
                let callbackQueue = this.subject.get(eventName);
                const filteredCallbackQueue = callbackQueue.filter(
                    (callbackObj) => callbackObj.key !== callbackKey
                );
                this.subject.set(eventName, filteredCallbackQueue);
                return undefined;
            },
        };
    }

    /**
     * @param {string} eventName
     * @param {Array} args
     * @return {Array}
     */
    emit(eventName, args = []) {
        if (typeof eventName !== "string") {
            throw new Error("event name must be a string !!");
        }

        const callbackQueue = this.subject.get(eventName);

        if (callbackQueue == null || callbackQueue?.length === 0) return [];
        const result = [];
        for (let i = 0; i < callbackQueue.length; i++) {
            result[i] = callbackQueue[i]["value"].apply({}, args);
        }

        return result;
    }
}

class EventEmitter2 {
    constructor(){
        this.events = new Map()
    }
    /**
     * @param {string} eventName
     * @param {Function} callback
     * @return {Object}
     */
    subscribe(eventName, callback) {
        if(!this.events.has(eventName)){
            this.events.set(eventName, [])
        }
        let listeners = this.events.get(eventName)
        listeners.push(callback)
        
        return {
            unsubscribe: () => {
                let index = listeners.indexOf(callback)
                if(index !== -1){
                    listeners.splice(index, 1)
                }
                return undefined
            }
        };
    }
    
    /**
     * @param {string} eventName
     * @param {Array} args
     * @return {Array}
     */
    emit(eventName, args = []) {
        let result = []

        if(this.events.has(eventName)){
            let listeners = this.events.get(eventName)
            for(let litsener of listeners){
                result.push(litsener(...args))
            }

           
        }
         return result
    }
}

const emitter = new EventEmitter2();

/**
 * [[], ["eventOne", "function cb1(...args) { return args.join(','); }"], ["eventOne", "function cb1(...args) { return args.join(','); }"], ["eventOne", [1,2,3]], [1],  ["eventOne", [7,8,9]]]
 */

function cb1(...args) {
  return args.join(",");
}

const e1 = emitter.subscribe("first", cb1);
const e2 = emitter.subscribe("first", cb1);

e2.unsubscribe();

const result = emitter.emit("first", [1, 2, 3, 4, 5]);

console.log(`result`, result);

console.dir(emitter, { depth: 5 });
