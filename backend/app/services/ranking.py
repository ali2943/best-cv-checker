from typing import List

from app.schemas.matching import MatchResult


def rank_results(results: List[MatchResult]) -> List[MatchResult]:
    return sorted(results, key=lambda item: item.score, reverse=True)

