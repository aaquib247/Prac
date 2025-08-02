interface Observer {
    update(data: string): void;
}

interface Subject {
    subscribe(observer: Observer): void;
    unsubscribe(observer: Observer): void;
    notify(data: string): void;
}

class NewsAgency implements Subject {
    private observers: Observer[] = [];

    subscribe(observer: Observer): void {
        this.observers.push(observer);
    }

    unsubscribe(observer: Observer): void {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notify(data: string): void {
        for (const observer of this.observers) {
            observer.update(data);
        }
    }

    // simulate publishing a news article
    publishNews(news: string) {
        console.log(`NewsAgency: Publishing news: ${news}`);
        this.notify(news);
    }
}

class EmailSubscriber implements Observer {
    constructor(private name: string) {}

    update(news: string): void {
        console.log(`${this.name} received news via Email: ${news}`);
    }
}

class SMSSubscriber implements Observer {
    constructor(private name: string) {}

    update(news: string): void {
        console.log(`${this.name} received news via SMS: ${news}`);
    }
}

const agency = new NewsAgency();

const emailUser = new EmailSubscriber("Alice");
const smsUser = new SMSSubscriber("Bob");

agency.subscribe(emailUser);
agency.subscribe(smsUser);

agency.publishNews("TypeScript 5.5 released!");
agency.publishNews("Observer pattern is awesome!");

// You can also unsubscribe
agency.unsubscribe(emailUser);
agency.publishNews("Alice won't get this news.");
