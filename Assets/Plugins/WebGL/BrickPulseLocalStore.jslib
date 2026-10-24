// Brick Pulse - customized edition by Trần Nguyễn Ngọc Khoa (Khoat0360).
// Third-party licenses: see THIRD_PARTY_NOTICES.md.
// BrickPulse — minimal bridge to the browser's localStorage for the high-score list.
// The game stores ONE key (a small JSON blob) entirely on the player's own device.
// Nothing is sent anywhere. Used only by Leaderboard.cs in WebGL builds.
mergeInto(LibraryManager.library, {
  // Returns a newly-malloc'd UTF8 string (caller frees via BrickPulseLSFree).
  BrickPulseLSGet: function (keyPtr) {
    var value = "";
    try {
      var key = UTF8ToString(keyPtr);
      value = window.localStorage.getItem(key) || "";
    } catch (e) {
      value = "";
    }
    var size = lengthBytesUTF8(value) + 1;
    var buffer = _malloc(size);
    stringToUTF8(value, buffer, size);
    return buffer;
  },

  BrickPulseLSSet: function (keyPtr, valuePtr) {
    try {
      window.localStorage.setItem(UTF8ToString(keyPtr), UTF8ToString(valuePtr));
    } catch (e) {
      // Quota exceeded or storage disabled (e.g. private mode): silently ignore.
    }
  },

  BrickPulseLSFree: function (ptr) {
    _free(ptr);
  }
});
