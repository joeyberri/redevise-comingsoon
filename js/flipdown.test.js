const FlipDown = require('./flipdown');

describe('FlipDown', () => {
  let mockElement;

  beforeEach(() => {
    mockElement = {
      classList: {
        add: jest.fn()
      },
      appendChild: jest.fn(),
      getElementsByClassName: jest.fn().mockReturnValue([])
    };

    // Manual mock for DOM
    global.document = {
      getElementById: jest.fn().mockReturnValue(mockElement),
      createElement: jest.fn().mockImplementation((tag) => ({
        className: '',
        setAttribute: jest.fn(),
        appendChild: jest.fn(),
        textContent: '',
        parentElement: {
          classList: {
            add: jest.fn(),
            remove: jest.fn()
          }
        }
      })),
      getElementsByClassName: jest.fn().mockReturnValue([])
    };
    global.window = {
      setInterval: jest.fn(),
      clearInterval: jest.fn(),
      setTimeout: jest.fn()
    };
    global.console = {
      log: jest.fn()
    };
    global.NodeList = Array;
  });

  test('should throw error when uts is a string', () => {
    expect(() => {
      new FlipDown('2025-01-01');
    }).toThrow('FlipDown: Constructor expected unix timestamp, got string instead.');
  });

  test('should throw error when uts is an object', () => {
    expect(() => {
      new FlipDown({ timestamp: 1735689600 });
    }).toThrow('FlipDown: Constructor expected unix timestamp, got object instead.');
  });

  test('should NOT throw error when uts is a number', () => {
    expect(() => {
      new FlipDown(1735689600);
    }).not.toThrow();
  });
});
