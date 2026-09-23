class Handler {
  setNext(handler) {
    this.next = handler;
    return handler;
  }

  handle(request) {
    if (this.next) {
      return this.next.handle(request);
    } else {
      console.log("❌ No handler could process:", request);
    }
  }
}

class Level1Support extends Handler {
  handle(request) {
    if (request.type === "basic") {
      console.log("✅ Level 1 handled:", request.message);
    } else {
      super.handle(request); // Pass to next
    }
  }
}

class Level2Support extends Handler {
  handle(request) {
    if (request.type === "technical") {
      console.log("✅ Level 2 handled:", request.message);
    } else {
      super.handle(request);
    }
  }
}

class Level3Support extends Handler {
  handle(request) {
    if (request.type === "admin") {
      console.log("✅ Level 3 handled:", request.message);
    } else {
      super.handle(request);
    }
  }
}

// Create handlers
const l1 = new Level1Support();
const l2 = new Level2Support();
const l3 = new Level3Support();

// Chain: L1 → L2 → L3
l1.setNext(l2).setNext(l3);

// Test requests
l1.handle({ type: "basic", message: "Reset password" });
l1.handle({ type: "technical", message: "Server down" });
l1.handle({ type: "admin", message: "Delete user" });
l1.handle({ type: "finance", message: "Reimburse refund" });
