jest.useFakeTimers();

jest.mock('react-native-bootsplash', () => {
  return {
    __esModule: true,
    default: {
      hide: jest.fn().mockResolvedValueOnce(),
      show: jest.fn().mockResolvedValueOnce(),
      getVisibilityStatus: jest.fn().mockResolvedValue('hidden'),
    },
  };
});
