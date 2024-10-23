import { HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { GiMicrophone } from "react-icons/gi";
import { IoIosAlbums } from "react-icons/io";
import Album from "./Album";

type IArtistRenderer = {
    data: any;
}

export default function ArtistRenderer({ data }: IArtistRenderer) {
    return (
        <VStack alignItems={'flex-start'}>
            <HStack>
                <Icon as={GiMicrophone} fontSize={'3xl'} />
                <Text as={"b"} fontSize={'3xl'}>{data.text}</Text>
            </HStack>
            <HStack>
                <Icon fontSize={'2xl'} as={IoIosAlbums} />
                <Text as={"b"} fontSize={'2xl'}>Albums</Text>
            </HStack>
            {data.albums?.map((item: any, index: number) => {
                return (
                    <Album key={index} title={item.title} description={item.description} songs={item.songs} titleFontSize={'xl'} showAlbumIcon={false} />
                )
            })}
        </VStack>
    )
}
