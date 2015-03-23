'use strict';

define(['jquery'], function($) {
    var youtubeApi = {};

    function video(id, callback) {
        $.ajax({ url:  'https://www.googleapis.com/youtube/v3/videos',
                 data: { id:   id,
                         part: 'snippet,statistics',
                         key:  youtubeApi.API_KEY } })
            .done(function(data) {
                callback(null, { content:     'youtube-video',
                                 id:          id,
                                 image:       data.items[0].snippet.thumbnails.medium.url,
                                 title:       data.items[0].snippet.localized.title,
                                 description: data.items[0].snippet.localized.description,
                                 date:        Date.parse(data.items[0].snippet.publishedAt),
                                 views:       data.items[0].statistics.viewCount,
                                 likes:       data.items[0].statistics.likeCount,
                                 dislikes:    data.items[0].statistics.dislikeCount,
                                 channel:     { id: data.items[0].snippet.channelId } });
            })
            .fail(function(jqXHR, textStatus, err) {
                callback(err);
            });
    }

    function channel(id, callback) {
        $.ajax({ url:  'https://www.googleapis.com/youtube/v3/channels',
                 data: { id:   id,
                         part: 'snippet,statistics',
                         key:  youtubeApi.API_KEY } })
            .done(function(data) {
                callback(null, { content:     'youtube-channel',
                                 id:          id,
                                 image:       data.items[0].snippet.thumbnails.medium.url,
                                 title:       data.items[0].snippet.localized.title,
                                 description: data.items[0].snippet.localized.description,
                                 videos:      data.items[0].statistics.videoCount,
                                 views:       data.items[0].statistics.viewCount,
                                 subscribers: data.items[0].statistics.subscriberCount });
            })
            .fail(function(jqXHR, textStatus, err) {
                callback(err);
            });
    }

    function comments(id, callback) {
        $.ajax({ url:  'https://gdata.youtube.com/feeds/api/videos/' + id + '/comments',
                 data: { 'max-results': 5 } })
            .done(function(xml) {
                $(xml)
                    .find('entry author uri')
                    .each(function() {
                        $.ajax({ url: $(this).text() });
                    });
            })
            .fail(function(jqXHR, textStatus, err) {
                callback(err);
            });
    }

    youtubeApi.API_KEY  = 'AIzaSyCIBp_dCztnCozkp1Yeqxa9F70rcVpFn30';
    youtubeApi.video    = video;
    youtubeApi.channel  = channel;
    youtubeApi.comments = comments;

    return youtubeApi;
});
