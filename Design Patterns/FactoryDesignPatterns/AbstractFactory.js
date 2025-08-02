// --- Product Interfaces ---

class Button {
  render() {
    throw new Error("render() must be implemented");
  }
}

class Checkbox {
  render() {
    throw new Error("render() must be implemented");
  }
}

// --- Windows Products ---

class WindowsButton extends Button {
  render() {
    console.log("Rendering Windows Button");
  }
}

class WindowsCheckbox extends Checkbox {
  render() {
    console.log("Rendering Windows Checkbox");
  }
}

// --- Mac Products ---

class MacButton extends Button {
  render() {
    console.log("Rendering Mac Button");
  }
}

class MacCheckbox extends Checkbox {
  render() {
    console.log("Rendering Mac Checkbox");
  }
}

// --- Abstract Factory Interface ---

class GUIFactory {
  createButton() {
    throw new Error("createButton() must be implemented");
  }

  createCheckbox() {
    throw new Error("createCheckbox() must be implemented");
  }
}

// --- Concrete Factories ---

class WindowsFactory extends GUIFactory {
  createButton() {
    return new WindowsButton();
  }

  createCheckbox() {
    return new WindowsCheckbox();
  }
}

class MacFactory extends GUIFactory {
  createButton() {
    return new MacButton();
  }

  createCheckbox() {
    return new MacCheckbox();
  }
}

// --- Client Code ---

function clientCode(factory) {
  const button = factory.createButton();
  const checkbox = factory.createCheckbox();

  button.render();
  checkbox.render();
}

// --- Usage ---

console.log("Windows UI:");
clientCode(new WindowsFactory());

console.log("\nMac UI:");
clientCode(new MacFactory());
