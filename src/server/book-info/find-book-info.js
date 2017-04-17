import request from 'request';

import BookInfo from './book-info.model';

function findBookInfo({ volumeID }) {
  return BookInfo
    .findOne({ volumeID })
    .exec()
    .then(info => {
      if (info) {
        return info;
      }

      const url = `https://www.googleapis.com/books/v1/volumes/${volumeID}`;

      return new Promise((resolve, reject) => {
        request({ url }, (err, res, body) => {
          if (err || res.statusCode !== 200) {
            return reject(err);
          }

          const result = JSON.parse(body);
          if (result.id !== volumeID) {
            return reject(new Error('Result mismatched'));
          }

          const placeholderThumbnail = 'https://books.google.com/googlebooks/images/no_cover_thumb.gif';
          const {
            volumeInfo: {
              title,
              subtitle,
              imageLinks: {
                thumbnail: originalThumbnail = placeholderThumbnail,
              } = { thumbnail: placeholderThumbnail },
            },
          } = result;

          const thumbnail = originalThumbnail
            .replace(/^https?:/, '')
            .replace(/&imgtk=[^&]+/, '');

          const bookInfo = { volumeID, title, subtitle, thumbnail };

          return resolve(BookInfo.create(bookInfo));
        });
      });
    });
}

export default findBookInfo;

