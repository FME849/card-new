import Engine, { DuelCommandBundle } from '@metacraft/murg-engine';
import { instantiate } from 'cc';

import { CardManager } from '../CardManager';
import { animateDrawEnemyCard, animateDrawPlayerCard } from '../tween/card';
import { selectDeckNode, selectHandNode } from '../util/helper';
import { getCenterExpos, getHandExpos, getRightExpos } from '../util/layout';
import { system } from '../util/system';

const { selectHand } = Engine;

export const animateCardDraw = async ({
	phaseOf,
	commands,
}: DuelCommandBundle): Promise<void> => {
	const promises = [];
	const deckNode = selectDeckNode(phaseOf).parent;
	const fromPosition = deckNode.getPosition();
	const currentHand = selectHand(system.duel, phaseOf);
	const createExpos = commands.length > 3 ? getCenterExpos : getRightExpos;
	const expoPositions = createExpos(commands.length);
	const handPositions = getHandExpos(
		selectHandNode(phaseOf),
		currentHand.length,
	);

	for (let i = 0; i < commands.length; i += 1) {
		const handIndex = currentHand.length - commands.length + i;
		const cardId = currentHand[handIndex];
		const expoPosition = expoPositions[i];
		const handPosition = handPositions[handIndex];
		const cardNode = instantiate(system.globalNodes.cardTemplate);

		cardNode.getComponent(CardManager).setCardId(cardId);
		cardNode.parent = system.globalNodes.board;
		system.cardRefs[cardId] = cardNode;

		if (system.duel.phaseOf === system.playerIds.me) {
			promises.push(
				animateDrawPlayerCard({
					node: cardNode,
					from: fromPosition,
					dest: handPosition,
					expoDest: expoPosition,
					delay: i * 0.3,
				}),
			);
		} else {
			promises.push(
				animateDrawEnemyCard({
					node: cardNode,
					from: fromPosition,
					dest: handPosition,
					delay: i * 0.2,
				}),
			);
		}
	}

	await Promise.all(promises);
};
