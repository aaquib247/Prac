// ── SUBSCRIBER (your Observer classes — rename print → onMessage) ──
class SMSSubscriber {
  onMessage(topic, value) {
    console.log(`SMS [${topic}]: ${value}`);
  }
}

class EmailSubscriber {
  onMessage(topic, value) {
    console.log(`Email [${topic}]: ${value}`);
  }
}

// ── TOPIC (one channel — owns its subscribers) ──
class Topic {
  constructor(name) {
    this.name = name;
    this.subscribers = [];
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber);
  }

  unsubscribe(subscriber) {
    this.subscribers = this.subscribers.filter(s => s !== subscriber);
  }

  publish(value) {
    this.subscribers.forEach(s => s.onMessage(this.name, value));
  }
}

// ── EVENT BUS (the broker — owns all topics) ──
class EventBus {
  constructor() {
    this.topics = {};
  }

  getTopic(name) {
    if (!this.topics[name]) this.topics[name] = new Topic(name);
    return this.topics[name];
  }

  publish(topicName, value) {
    this.getTopic(topicName).publish(value);
  }

  subscribe(topicName, subscriber) {
    this.getTopic(topicName).subscribe(subscriber);
  }

  unsubscribe(topicName, subscriber) {
    this.getTopic(topicName).unsubscribe(subscriber);
  }
}

// ── TEST ──
const bus = new EventBus();

const sms   = new SMSSubscriber();
const email = new EmailSubscriber();

bus.subscribe('weather', sms);
bus.subscribe('weather', email);
bus.subscribe('news', email);       // email subscribes to two topics

bus.publish('weather', 'Very Hot');
bus.publish('news', 'Election Results');

bus.unsubscribe('weather', sms);
bus.publish('weather', 'Cloudy');   // sms no longer gets this


// ┌─────────────────────────────────────┐
// │            EventBus  (broker)        │
// │  topics: { weather: Topic,           │
// │             news: Topic, ... }       │
// │  publish(topic, value)               │
// │  subscribe(topic, subscriber)        │
// │  unsubscribe(topic, subscriber)      │
// └─────────────────────────────────────┘
//               │ has many
//               ▼
// ┌─────────────────────────┐
// │          Topic           │
// │  name                    │
// │  subscribers[]           │
// │  publish(value)          │
// │  subscribe(subscriber)   │
// │  unsubscribe(subscriber) │
// └─────────────────────────┘
//               │ notifies many
//               ▼
// ┌──────────────────────────┐
// │  SMSSubscriber            │
// │  EmailSubscriber          │
// │  onMessage(topic, value)  │  ← same interface, swappable
// └──────────────────────────┘

// 1. Start with the diagram — draw these 3 boxes:


// Publisher → EventBus → Topic → Subscriber
// Say: "Publisher and Subscriber never talk directly — EventBus is the broker in the middle."

// 2. Walk the classes — one line each:

// EventBus → manages all topics, the broker
// Topic → one channel, owns its subscriber list
// Subscriber → reacts via onMessage() — same interface, swappable
// 3. Show extensibility — this is where you score points:

// Add WhatsAppSubscriber → new class, zero changes to EventBus or Topic ✅
// Add sports topic → just bus.subscribe('sports', ...) ✅
// Add PushNotificationSubscriber → same ✅
// Say: "Any new subscriber is just a new class with onMessage(). Open for extension, closed for modification."

// 4. Design pattern name — say it explicitly:

// "This is the Observer Pattern — but with a broker in the middle making it Pub/Sub. The broker decouples publishers from subscribers completely."