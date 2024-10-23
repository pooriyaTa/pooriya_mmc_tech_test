import { Box, HStack, Icon, Text, TypographyProps } from '@chakra-ui/react';
import { GiMicrophone } from 'react-icons/gi';
import { IoIosAlbums, IoMdMusicalNotes } from 'react-icons/io';
import Songs, { Isong } from './Songs';
type IAlbum = {
    title: string;
    description: string;
    songs: Isong[]
    key?: number;
    artist?: string | undefined
    titleFontSize?: TypographyProps['fontSize'];
    showAlbumIcon?: boolean
}
export default function Album({ title, description, songs, artist, key, titleFontSize = '3xl', showAlbumIcon = true }: IAlbum) {
    return (
        <Box key={key}>
            <HStack>
                {showAlbumIcon &&
                    <Icon as={IoIosAlbums} fontSize={titleFontSize} />
                }
                <Text as={"b"} fontSize={titleFontSize}>{title} </Text>
            </HStack>
            {artist &&
                <HStack>
                    <Icon as={GiMicrophone} fontSize={'2xl'} />
                    <Text as={"b"} fontSize={'xl'}>{artist}</Text>
                </HStack>
            }
            <Text mb={'2'}>{description}</Text>
            <HStack>
                <Icon as={IoMdMusicalNotes} />
                <Text as={'b'}>Album songs</Text>
            </HStack>
            <Songs data={songs} />
        </Box>
    )
}
