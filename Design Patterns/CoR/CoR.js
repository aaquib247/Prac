class Handler {
  
    constructor(){
      this.next = null;
    }
  
    setNext(handler) {
        this.next = handler;
        return handler; // allows chaining: a.setNext(b).setNext(c)
    }

    handle(amount) {
        if (this.next) {
            return this.next.handle(amount);
        }
        console.log(`No one can approve $${amount}`);
        return false;
    }
}

class TeamLeadHandler extends Handler {
    handle(amount) {
        if (amount <= 1000) {
            console.log(`TeamLead approved $${amount}`);
            return true;
        }
        return super.handle(amount);
    }
}

class ManagerHandler extends Handler {
    handle(amount) {
        if (amount <= 10000) {
            console.log(`Manager approved $${amount}`);
            return true;
        }
        return super.handle(amount);
    }
}

class DirectorHandler extends Handler {
    handle(amount) {
        if (amount <= 100000) {
            console.log(`Director approved $${amount}`);
            return true;
        }
        return super.handle(amount);
    }
}

// Wire
const teamLead = new TeamLeadHandler();
const manager = new ManagerHandler();
const director = new DirectorHandler();

teamLead.setNext(manager).setNext(director);

// Test
teamLead.handle(500);     // TeamLead approved
teamLead.handle(5000);    // Manager approved
teamLead.handle(50000);   // Director approved
teamLead.handle(200000);  // No one can approve
