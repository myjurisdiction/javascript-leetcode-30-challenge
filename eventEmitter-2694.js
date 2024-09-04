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