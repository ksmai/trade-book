import BookInfo from './book-info.model';
import request from 'request';

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
          const {
            id: volumeID,
            volumeInfo: {
              title,
              subtitle,
              imageLinks: {
                thumbnail: originalThumbnail,
              },
            },
          } = result;

          const thumbnail = originalThumbnail
            .replace(/^https?:/, '')
            .replace(/&imgtk=[^&]+/, '');
          
          const bookInfo = { volumeID, title, subtitle, thumbnail };
          resolve(BookInfo.create(bookInfo));
      });
    });
  });
}

export default findBookInfo;

