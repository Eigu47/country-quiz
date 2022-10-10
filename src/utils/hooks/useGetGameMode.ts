import { useRouter } from "next/router";

import { GAME_MODES } from "../../constants/game-const";

export default function useGetGameMode() {
  const router = useRouter();

  const currentGame = router.pathname.replace("/", "");

  return GAME_MODES.find((mode) => mode.name === currentGame);
}
