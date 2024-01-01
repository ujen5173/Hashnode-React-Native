import React, { useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { Article } from '.';
import Card from '../../components/Card';
import CardLoading from '../../components/CardLoading';
import { serverEndPoint } from '../../constants/url';
import fetchData from '../../helpers/fetch';
import storage from '../../helpers/storage';
import tw from '../../lib/tailwind';

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [articles, setArticles] = React.useState<Article[]>([]);

  useEffect(() => {
    if (!bookmarks.length) return;

    void (async () => {
      setLoading(true);
      const url = `${serverEndPoint}/api/v1/articles/multiple`
      const res = await fetchData<Article[]>(url, {
        method: 'POST',
        data: { ids: bookmarks }
      });

      if (res.success && res.data) {
        setArticles(res.data);
      }

      setLoading(false);
    })()
  }, [bookmarks]);

  storage.load({
    key: 'bookmarks',
    autoSync: true,
    syncInBackground: true,
    syncParams: {
      extraFetchOptions: {},
      someFlag: true,
    },
  }).then((res) => {
    setBookmarks(res || []);
    return res
  })

  return (
    <View style={tw`bg-slate-100 dark:bg-slate-900 flex-1`}>
      {
        loading ? (
          <View>
            {
              Array(7).fill(0).map((_, index) => (
                <View key={index} style={tw`${index === 2 ? "border-0" : "border-b"} border-slate-400 dark:border-slate-600`}>
                  <CardLoading />
                </View>
              ))
            }
          </View>
        ) : (<FlatList
          data={articles}
          keyExtractor={item => item._id}
          renderItem={({ item, index }) => (
            <View key={index} style={tw`${index === articles.length - 1 ? "border-0" : "border-b"} border-slate-400 dark:border-slate-600`}>
              <Card article={item} />
            </View>
          )}
        />)
      }
    </View>

  )
}

export default Bookmarks