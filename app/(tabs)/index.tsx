import { Text, View, Image, ScrollView, ActivityIndicator, FlatList } from "react-native";
import {Link} from "expo-router";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import SearchBar from "../components/SearchBar";
import { useRouter } from 'expo-router'
import { fetchMovies } from "@/services/api";
import useFecth from "@/services/useFetch";

// đây là trang chủ của ứng dụng, hiển thị list phim mới nhất và thanh search
// khi người dùng nhập từ khóa vào thanh search và nhấn nút tìm kiếm, app nhảy đến /search và hiển thị kết quả tìm kiếm
// sử dụng useFetch để gọi API lấy list phim mới nhất

export default function Index() {
  const router = useRouter();


  const { 
    data: movies, 
    loading: moviesLoading, 
    error: moviesError} = useFecth(() => fetchMovies({
    query: ''}
  ));
  return (
      <View className=" flex-1 bg-primary">
         <Image source={images.bg} className="absolute w-full z-0"/>
          <ScrollView className="flex-1 px-5" 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{minHeight:"100%", paddingBottom:10}}>
            <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto"/>

            {moviesLoading ? (
              <ActivityIndicator 
                size="large" 
                color="#0000ff" 
                className="mt-10 self-center"/>
            )
            : moviesError ? (
              <Text> Error: {moviesError?.message}</Text>)
            : (
             <View className="flex-1 mt-5">
              <SearchBar
                onPress={()=> router.push("/search")}
                placeholder = "Search for a movie"/>

                <>
                  <Text className="text-lg text-white font-bold mt-5 mb-3">
                    Latest Movies</Text>
                  <FlatList 
                    data ={movies}
                    renderItem={({item}) => ( 
                      <Text className="text-white text-sm">{item.title}</Text>
                    )}

                    //help react native identify each item in the list, 
                    // avoid re-render all items when only one item changes
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={3}
                    columnWrapperStyle={{
                      justifyContent: "flex-start",
                      gap: 20,
                      marginBottom: 10,
                      paddingRight: 5
                    }}
                    className="mt-2 pb-32"
                    scrollEnabled={false} // disable scroll in FlatList, use ScrollView
                  />
                </>
            </View>
            )
            }

            
        

          </ScrollView>
      </View>
  );
}
