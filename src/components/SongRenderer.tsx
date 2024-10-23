import { HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { GiMicrophone } from "react-icons/gi";
import { IoIosAlbums, IoMdMusicalNotes } from "react-icons/io";
import Songs from "./Songs";

type ISongRenderer = {
    data: any;
}
export default function SongRenderer({ data }: ISongRenderer) {
    const otherAlbumSongs = data.album.songs.filter((e: any) => e.title != data.text)
    return (
        <VStack alignItems={'flex-start'}>
            <HStack justifyContent={'space-between'} w={'full'}>
                <HStack>
                    <Icon as={IoMdMusicalNotes} fontSize={'3xl'} />
                    <Text as={"b"} fontSize={'3xl'}>{data.text}</Text>
                </HStack>
                <Text fontSize={'2xl'}>{data.length}</Text>
            </HStack>
            <HStack>
                <HStack>
                    <Icon as={GiMicrophone} fontSize={'xl'} />
                    <Text as={"b"} fontSize={'lg'} mr={'2'}>{data.artist.name}</Text>
                    <Icon as={IoIosAlbums} />
                    <Text as={"b"} fontSize={'lg'}>{data.album.title}</Text>
                </HStack>
            </HStack>
            <Text as={"b"} fontSize={'lg'}>Other album songs</Text>
            <Songs data={otherAlbumSongs} />

        </VStack>
    )
}
