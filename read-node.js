#!/usr/bin/env node

const osa = require('osa2');

// https://stackoverflow.com/a/54763669/4475887
// by Mike Miklin (MiklinMA@gmail.com).
function createDesktop() {
  Application('Mission Control').launch();

  const systemEvents = Application('System Events');
  const dockProcess = systemEvents.processes['Dock'];
  const group = dockProcess.groups[0].groups[0].groups[1];
  const button = group.buttons.whose({ description: 'add desktop'})[0];
  Application('System Events').click(button);

  delay(0.5);
  const list = group.lists[0];
  Application('System Events').click(list.buttons[list.buttons.length - 1]);
  delay(0.5);
}

function showBook() {
  const screen = Application('Finder').desktop.window.bounds();
  const chrome = Application('Google Chrome');

  const readerWindow = chrome.Window().make();
  readerWindow.bounds = {
    x: 0,
    y: 0,
    width: screen.width / 2,
    height: screen.height
  };
  readerWindow.tabs[0].url = 'https://play.google.com/books';
}

function showNotes() {
  const screen = Application('Finder').desktop.window.bounds();
  const chrome = Application('Google Chrome');

  const keepWindow = chrome.Window().make();
  keepWindow.bounds = {
    x: screen.width / 2,
    y: 22,  // the same effect as 0.
    width: screen.width / 2,
    height: screen.height / 2 - 11
  };
  keepWindow.tabs[0].url = 'https://keep.google.com/u/0/#label/reading';
}

function showDict() {
  const screen = Application('Finder').desktop.window.bounds();

  const dict = Application('EuDic');
  dict.quit();
  dict.activate();
  const dictWindow = dict.windows.whose({ name: '欧路词典'})[0];
  dictWindow.bounds = {
    x: screen.width / 2,
    y: screen.height / 2 + 11,
    width: screen.width / 2,
    height: screen.height / 2 - 11
  };
  dictWindow.visible = true;
  dict.showDic({withWord: 'It is reading time!'});
}

osa(createDesktop)()
  .then(osa(showDict))
  .then(osa(showNotes))
  .then(osa(showBook));

