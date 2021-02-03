import { Flex, Box, Heading, Spacer, Menu, Button, MenuList, MenuButton, MenuItem } from "@chakra-ui/react"
import { ChevronDownIcon } from '@chakra-ui/icons'
import { useHistory } from "react-router-dom";

import { UserLocalStore } from "../services/cache/UserLocalStore";

type NavBarProps = {
  cache: UserLocalStore
}

const NavBar = ({ cache }: NavBarProps) => {
  const history = useHistory()
  const currentUser = cache.retrieve()

  const logout = () => {
    cache.delete()
    history.replace("/login")
  }

  return (
    <Flex p="3" borderBottom="1px solid" borderColor="gray.300">
      <Box p="2">
        <Heading size="md">Map App</Heading>
      </Box>
      <Spacer />
      <Box>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            {currentUser?.user.email}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => history.push("/profile")}>Edit Profile</MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  )
}

export default NavBar;
