import { Text, VStack } from "@chakra-ui/react";
import Album from "./Album";


type IAlbumRenderer = {
    data: any;
}
export default function AlbumRenderer({ data }: IAlbumRenderer) {

    const otherAlbums = data.artist.albums.filter((e: any) => e.title != data.text)

    console.log(otherAlbums)
    return (
        <VStack alignItems={'flex-start'}>
            <Album title={data.text} description={data.description} songs={data.songs} artist={data.artist.name} />
            <Text as={"b"} fontSize={'xl'}>Other Albums by {data.artist.name}</Text>
            {otherAlbums.map((item: any, index: number) => {
                return (
                    <Album key={index} title={item.title} description={item.description} songs={item.songs} artist={data.artist.name} />
                )
            })}

        </VStack>
    )
}
