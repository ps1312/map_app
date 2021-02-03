import { Component } from "react";
import { Heading, Container, Spinner, Box } from "@chakra-ui/react";

import ProfileForm, { EditProfileFormValues } from "./components/ProfileForm";
import { GetUserProfile } from "../../models/GetUserProfile";
import { UserLocalStore } from "../../services/cache/UserLocalStore";
import { AuthenticatedUser } from "../../models/AuthenticatedUser";
import { User } from "../../models/User";
import { EditUserProfile } from "../../models/EditUserProfile";

type ProfilePageProps = {
  loader: GetUserProfile;
  cache: UserLocalStore;
  updater: EditUserProfile;
}

type ProfilePageState = {
  isLoading: boolean;
  isUpdatingUser: boolean;
  loadedUser: User | null;
  failed: boolean;
}

class ProfilePage extends Component<ProfilePageProps, ProfilePageState> {
  constructor(props: ProfilePageProps) {
    super(props)

    this.state = {
      isLoading: false,
      isUpdatingUser: false,
      loadedUser: null,
      failed: false,
    }
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true }, async () => await this.loadUser());
  }

  persistUserLocally = (apiUser: User): User => {
    const { cache } = this.props
    const currentUser = cache.retrieve()!
    const updatedUser: AuthenticatedUser = {
      user: { ...apiUser },
      token: currentUser.token
    }
    cache.insert(updatedUser)

    return updatedUser.user;
  }

  loadUser = async () => {
    const { loader, cache } = this.props
    const currentUser = cache.retrieve()!

    try {
      const apiUser = await loader.find(currentUser.user.email!)
      const updatedUser = this.persistUserLocally(apiUser)
      this.setState({ isLoading: false, loadedUser: updatedUser })
    } catch (error) {
      this.setState({ isLoading: false, failed: true })
    }
  }

  updateUser = async (values: EditProfileFormValues) => {
    this.setState({ isUpdatingUser: true, failed: false })
    const { updater } = this.props;
    const { loadedUser } = this.state;

    try {
      const apiUser = await updater.update(loadedUser?.id!, values)
      const updatedUser = this.persistUserLocally(apiUser)
      this.setState({ isUpdatingUser: false, loadedUser: updatedUser })
    } catch {
      this.setState({ isUpdatingUser: false, failed: true })
    }
  }

  render() {
    const { isLoading, isUpdatingUser, loadedUser, failed } = this.state;

    const initialFormValues = {
      email: loadedUser?.email || "",
      first_name: loadedUser?.first_name || "",
      last_name: loadedUser?.last_name || "",
    }

    return (
      <>
        <Box h="100px" />
        <Container border="1px solid" borderColor="gray.300" padding="10" borderRadius="lg" display="flex" flexDirection="column">
          <Heading alignSelf="center" size="lg" mb="10">Update your account</Heading>
          
          {isLoading ? (
            <Spinner alignSelf="center" thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
          ) : (
            <ProfileForm
              failed={failed}
              isLoading={isUpdatingUser}
              initialValues={initialFormValues}
              onSubmit={this.updateUser}
            />
          )}
        </Container>
      </>
    )
  }
}

export default ProfilePage;