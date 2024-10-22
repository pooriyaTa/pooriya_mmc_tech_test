import { Box, Container, Icon, Text, Tooltip } from "@chakra-ui/react";
import { useState } from "react";
import { GiMicrophone } from "react-icons/gi";
import { IoIosAlbums, IoMdMusicalNotes } from "react-icons/io";
import '../App.css';
import SearchBar from "../components/SearchBar";
import { datasource } from "../datasource/data";
import { getTruncatedSearchedText } from "../helpers/string.helper";

type ISuggestion = {
    type: string;
    text: string;
    subText?: string | undefined;
    fullDescription?: string | undefined;
    length?: string | undefined
    artist?: any,
    albums?: any,
}


export default function MainPage() {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<ISuggestion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false)

    const onSearch = (text: string) => {
        setQuery(text)
        if (text.length >= 2) {
            const filteredSuggestions = getFilteredSuggestions(text);
            setShowSuggestions(true)
            setSuggestions(filteredSuggestions);
        } else {
            setShowSuggestions(false)
            setSuggestions([]);
        }
    };

    const getFilteredSuggestions = (input: string) => {
        const lowercaseInput = input.toLowerCase();

        return datasource.flatMap((artist) => {
            const albums = artist.albums.flatMap((album) => {
                const songs = album.songs.filter((song) =>
                    song.title.toLowerCase().includes(lowercaseInput)
                );
                return [
                    ...(album.title.toLowerCase().includes(lowercaseInput)
                        ? [{ type: 'album', text: album.title, artist }]
                        : []),
                    ...songs.map((song) => ({
                        artist,
                        type: 'song',
                        text: `${album.title} - ${song.title}`,
                        length: song.length
                    }))
                ];
            });

            const descriptionMatch = artist.albums.find((album) =>
                album.description.toLowerCase().includes(lowercaseInput)
            );

            return [
                ...(artist.name.toLowerCase().includes(lowercaseInput)
                    ? [{ type: 'artist', text: artist.name, albums: artist.albums }]
                    : []),
                ...albums,
                ...(descriptionMatch
                    ? [
                        {
                            artist,
                            type: 'description',
                            text: descriptionMatch.title,
                            fullDescription: descriptionMatch.description,
                            subText: getTruncatedSearchedText(descriptionMatch.description, lowercaseInput, 50),
                        }
                    ]
                    : [])
            ];
        });
    };

    const clearInput = () => {
        setShowSuggestions(false)
        setQuery('')
        setSuggestions([])
    }

    const onClickSuggestion = (item: ISuggestion) => {
        setQuery(item.text)
        setShowSuggestions(false)
    }

    const highlightMatch = (text: string, query: string, fontSize = "md", color = 'black') => {
        const index = text?.toLowerCase().indexOf(query.toLowerCase());

        if (index === -1) {
            return <Text>{text}</Text>;
        }

        const beforeMatch = text.substring(0, index);
        const match = text.substring(index, index + query.length);
        const afterMatch = text.substring(index + query.length);

        return (
            <Text as="span" fontSize={fontSize} color={color}>
                {beforeMatch}
                <Text as="span" textDecoration="underline" fontWeight="bold" color="blue.600">
                    {match}
                </Text>
                {afterMatch}
            </Text>
        );
    };

    return (
        <div className="main">
            <SearchBar
                value={query}
                onValueChange={onSearch}
                placeholder="Search musicians, albums, or songs..."
                onClearInput={clearInput}
                suggestions={suggestions}
                suggestionsVisible={showSuggestions}
                renderSuggestions={(item: ISuggestion, index: number) => {
                    return (
                        <Container onClick={() => onClickSuggestion(item)} key={index} cursor={"pointer"} py="2" px={4} display={'flex'} alignItems={'center'} _hover={{ bg: "#ebebeb" }} w={"full"}>
                            <Tooltip textTransform={"capitalize"} label={item.type}>
                                <>
                                    {item.type == "album" &&
                                        <Icon as={IoIosAlbums} />
                                    }
                                    {item.type == "artist" &&
                                        <Icon as={GiMicrophone} />
                                    }
                                    {item.type == "song" &&
                                        <Icon as={IoMdMusicalNotes} />
                                    }
                                    {item.type == "description" &&
                                        <Icon as={IoIosAlbums} />
                                    }
                                </>
                            </Tooltip>

                            <Box ml={4} display={'flex'} flexDirection={'column'}>
                                {highlightMatch(item.text, query)}
                                {item.subText && highlightMatch(item.subText, query, 'sm', 'gray')}
                            </Box>

                        </Container>
                    )
                }}
            />

        </div>
    )
}
