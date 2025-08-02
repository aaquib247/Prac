var NewsAgency = /** @class */ (function () {
    function NewsAgency() {
        this.observers = [];
    }
    NewsAgency.prototype.subscribe = function (observer) {
        this.observers.push(observer);
    };
    NewsAgency.prototype.unsubscribe = function (observer) {
        this.observers = this.observers.filter(function (obs) { return obs !== observer; });
    };
    NewsAgency.prototype.notify = function (data) {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var observer = _a[_i];
            observer.update(data);
        }
    };
    // simulate publishing a news article
    NewsAgency.prototype.publishNews = function (news) {
        console.log("NewsAgency: Publishing news: ".concat(news));
        this.notify(news);
    };
    return NewsAgency;
}());
var EmailSubscriber = /** @class */ (function () {
    function EmailSubscriber(name) {
        this.name = name;
    }
    EmailSubscriber.prototype.update = function (news) {
        console.log("".concat(this.name, " received news via Email: ").concat(news));
    };
    return EmailSubscriber;
}());
var SMSSubscriber = /** @class */ (function () {
    function SMSSubscriber(name) {
        this.name = name;
    }
    SMSSubscriber.prototype.update = function (news) {
        console.log("".concat(this.name, " received news via SMS: ").concat(news));
    };
    return SMSSubscriber;
}());
var agency = new NewsAgency();
var emailUser = new EmailSubscriber("Alice");
var smsUser = new SMSSubscriber("Bob");
agency.subscribe(emailUser);
agency.subscribe(smsUser);
agency.publishNews("TypeScript 5.5 released!");
agency.publishNews("Observer pattern is awesome!");
// You can also unsubscribe
agency.unsubscribe(emailUser);
agency.publishNews("Alice won't get this news.");
